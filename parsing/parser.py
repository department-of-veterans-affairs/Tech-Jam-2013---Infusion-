import re
from os import listdir
from os.path import isfile, join

onlyfiles = [ join('data', f) for f in listdir('data') if isfile(join('data',f)) ]

def parse_kvp(targets, line):
    result = re.search('^([\w\s]+):(.*)$', line)
    if result is None:
        return (None, None)
    key = result.group(1)
    val = result.group(2)
    if key is None or val is None or key not in targets:
        return (None, None)

    return (key, val.strip())

def parse_simple(targets, lines):
    kvs = {}
    targets = targets
    for line in lines:
        key, val = parse_kvp(targets, line)
        if key is not None:
            kvs[key] = val
    return kvs

def parse_demographics(name, lines):
    targets = ['Source', 'First Name', 'Middle Initial', 'Last Name', 'Suffix', 'Alias', 'Relationship to VA', 'Date of Birth', 'Marital Status', 'Current Occupation',
               'Mailing or Destination Address', 'Mailing or Destination Address2', 'Mailing or Destination City', 'Mailing or Destination State',
               'Mailing or Destination Country', 'Mailing or Destination Province', 'Mailing or Destination Zip/Postal Code', 'Home Phone Number', 'Work Phone Number',
               'Pager Number', 'Cell Phone Number', 'FAX Number', 'Email Address', 'Preferred Method of Contact']
    return (name, parse_simple(targets, lines))

def parse_subtarget(name, targets, lines):
    for i in range(len(lines)):
        line = lines[i].rstrip()
        if line == name + ":":
            simple = parse_simple(targets, lines[i+1:len(lines)])
            return simple


def parse_va_appointments(name, lines):
    targets = ['Source', 'Last Updated']


    simple = parse_simple(targets, lines)
    res = {}

    res = dict(simple.items())

    future_appointments = 'FUTURE APPOINTMENTS'
    future_appointments_subtargets = ['Date/Time', 'Location', 'Status', 'Clinic', 'Phone Number', 'Type']
    res[future_appointments] = parse_subtarget(future_appointments, future_appointments_subtargets, lines)

    past_appointments = 'PAST APPOINTMENTS'
    past_appointments_subtargets = ['Date/Time', 'Location', 'Status', 'Clinic', 'Phone Number', 'Type', 'Note']
    res[past_appointments] = parse_subtarget(past_appointments, past_appointments_subtargets, lines)

    return (name, res)

def parse_vitals(name, lines):
    targets = ['Source']
    return (name, parse_simple(targets, lines))

def parse_medical_events(name, lines):
    targets = ['Source']
    return (name, parse_simple(targets, lines))

def parse_healthcare_providers(name, lines):
    targets = ['Source']
    return (name, parse_simple(targets, lines))

def parse_wellness_reminders(name, lines):
    targets = ['Source', 'Last Updated']
    return (name, parse_simple(targets, lines))

def parse_toplevel(sections, lines):
    parsed_obj = {}
    for section in sections:
        try:
            name, obj = {
                'DEMOGRAPHICS': parse_demographics,
                'VITALS AND READINGS': parse_vitals,
                'MEDICAL EVENTS': parse_medical_events,
                'VA WELLNESS REMINDERS': parse_wellness_reminders,
                'HEALTH CARE PROVIDERS': parse_healthcare_providers,
                'VA APPOINTMENTS' : parse_va_appointments
            }[section[0]](section[0], lines[section[1]:section[2]])
            parsed_obj[name] = obj
        except KeyError:
            pass # Just skip this section since not implemented yet
    return parsed_obj

parsed_objs = []

for file in onlyfiles:
    f = open(file)
    lines = f.readlines()
    f.close()

    sections = []
    for index in range(len(lines)):
        result = re.search('^-+\s([\w\s]+)\s-+$', lines[index])
        if result is not None:
            section_name = result.group(1)
            if len(sections) > 0:
                sections[-1].append(index)
            sections.append([section_name, index])
    sections[-1].append(len(lines))

    parsed_objs.append(parse_toplevel(sections, lines))

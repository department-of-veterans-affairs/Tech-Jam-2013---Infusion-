import re

f = open('data/sample.txt')
lines = f.readlines()
f.close()

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
    targets = ['Source', 'First Name']
    return (name, parse_simple(targets, lines))

def parse_toplevel(sections, lines):
    parsed_obj = {}
    for section in sections:
        try:
            name, obj = {
                'DEMOGRAPHICS': parse_demographics
            }[section[0]](section[0], lines[section[1]:section[2]])
            parsed_obj[name] = obj
        except KeyError:
            pass # Just skip this section since not implemented yet
    return parsed_obj

sections = []
for index in range(len(lines)):
    result = re.search('^-+\s([\w\s]+)\s-+$', lines[index])
    if result is not None:
        section_name = result.group(1)
        if len(sections) > 0:
            sections[-1].append(index)
        sections.append([section_name, index])
sections[-1].append(len(lines))

print(sections)

parsed_obj = parse_toplevel(sections, lines)
print(parsed_obj)
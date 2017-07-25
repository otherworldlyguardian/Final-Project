# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

system_list = JSON.parse(File.read('db/trimmedSS.json'))

def k_space(sec)
  case sec
  when 0.5..1
    return 'H'
  when -1..0
    return '0.0'
  else
    return 'L'
  end
end

def w_space(system)
  return {
    class_id: id_case(system['REGIONID']),
    statics: static_case(system['CONSTELLATIONID'])
  }
end

def id_case(region)
  case region.to_s[6..7].to_i
  when 1..3
    return 'C1'
  when 4..8
    return 'C2'
  when 9..15
    return 'C3'
  when 16..23
    return 'C4'
  when 24..29
    return 'C5'
  when 30
    return 'C6'
  end
end

def static_case(constellation)
  case constellation.to_s[5..7].to_i
  when 1..20
    return ['N110']
  when 21..30
    return ['B247', 'O477']
  when 31..40
    return ['B247', 'Y683']
  when 41..54
    return ['A239', 'D382']
  when 55..59
    return ['E545', 'N062']
  when 60..75
    return ['B247', 'Z647']
  when 76..105, 122..128, 144..152
    return ['U210']
  when 106..121
    return ['D845']
  when 129..143
    return ['K346']
  when 153..155, 173, 187, 189..190, 192
    return ['N766', 'X877']
  when 156, 167, 170
    return ['P060', 'N766']
  when 157..158, 217, 221, 224
    return ['N766', 'H900']
  when 158..161, 198..199, 202, 212, 228
    return ['N766', 'C247']
  when 162, 164, 226
    return ['H900', 'U574']
  when 163, 211
    return ['C247', 'U574']
  when 165, 178, 182
    return ['X877', 'U574']
  when 166, 172
    return ['P060', 'C246']
  when 168, 225
    return ['P060', 'H900']
  when 169, 171, 174, 193
    return ['P060', 'X877']
  when 175..177, 183..184, 191, 194..195, 200..201, 203, 206..207, 227, 229..230
    return ['C247', 'X877']
  when 179..181, 185..186, 188, 214, 216, 220, 222
    return ['X877', 'H900']
  when 196, 205, 231
    return ['P060', 'C247']
  when 197, 203..204, 208..210, 213, 215, 218..219, 223
    return ['C247', 'H900']
  when 232, 236, 240..255, 274..285
    return ['H296']
  when 233, 239
    return ['Y790']
  when 234..235, 237..238
    return ['D364']
  when 256..264
    return ['V753']
  when 265..273
    return ['M267']
  when 286..296
    return ['E175']
  when 297
    return ['G024']
  when 298, 303
    return ['W237']
  when 299, 306..310
    return ['V911']
  when 300, 304
    return ['L477']
  when 301
    return ['Q317']
  when 302, 305
    return ['Z457']
  when 311..313
    return ['Z060']
  when 314..323
    return ['J244']
  end
end

system_list.each do |system|
  if system['REGIONID'].to_s[1] === '1'
    w_data = w_space(system)
    if w_data[:statics].length === 2
      System.create(name: system['SOLARSYSTEMNAME'], region_id: system['REGIONID'], constellation_id: system['CONSTELLATIONID'], solar_id: system['SOLARSYSTEMID'], security: w_data[:class_id], static1: w_data[:statics][0], static2: w_data[:statics][1])
    else
      System.create(name: system['SOLARSYSTEMNAME'], region_id: system['REGIONID'], constellation_id: system['CONSTELLATIONID'], solar_id: system['SOLARSYSTEMID'], security: w_data[:class_id], static1: w_data[:statics][0])
    end
  else
    k_data = k_space(system['SECURITY'])
    System.create(name: system['SOLARSYSTEMNAME'], region_id: system['REGIONID'], constellation_id: system['CONSTELLATIONID'], solar_id: system['SOLARSYSTEMID'], security: k_data)
  end
end

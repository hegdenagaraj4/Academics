with open('/home/sahil/Downloads/alloutput/multiplewith3.txt','r') as f:
	rules = f.readlines()

#tests = []
#with open('/home/pravin/test.txt') as f:
#	tests.append(f.readlines().split(' '))


with open('/home/sahil/Downloads/multiplewith3test.txt') as f:
	tests = f.readlines()

#print 'rules',rules	
for i, ex in enumerate(tests):
	tests[i] = ex[0:len(ex)-1].split()

#print tests
pos = 0
neg = 0
d = dict()

def update(cls_label):
	global d, pos, neg
	for record in tests:
		match = 1
		for key in d:
			if d[key]!=record[(int)(key)]:
				match=0
				#print key, d[key],record
				break #go for next record
		if match==1:
			if cls_label==record[8]: #dont forget to change this!
				print '+ve ',record, d, cls_label
				pos+=1
			else:
				print '-ve', record, d, cls_label
				neg+=1 
		
		
for i, line in enumerate(rules):
	line = line[1:len(line)-1]
	#print line.split()
	
	i=0
	while i<len(line.split())-1:
		d[line.split()[i]] = line.split()[i+1]
		i+=2
	#print 'dict',d
	cls_label = line.split()[len(line.split())-1]	
	update(cls_label)

print 'positives',pos
print 'negetives',neg
	 
		
		
          

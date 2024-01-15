arr = [1,2,3,4,4,5,5,6,7]
uni_list=[]
duplicate_list=[]


for i in arr:
    if i not in uni_list:
        uni_list.append(i)
    elif i not in duplicate_list:
        duplicate_list.append(i)

print(duplicate_list)
import xlwings as xl

#生成文件
app = xl.App(visible=False, add_book=False)#可见性和是否添加
workbook = app.books.add()

workbook.save(r'temple\1.xlsx')#保存工作簿（路径内不能含有中文字符）
workbook.close()
app.quit()

#打开文件
app = xl.App(visible=True, add_book=False)
workbook = app.books.open(r'temple\1.xlsx')
#操纵工作表和单元格
worksheet = workbook.sheets['Sheet1']#选中工作表1
worksheet.range('A1').value = '编号'
worksheet = workbook.sheets.add('产品统计表')#新建工作表
workbook.save(r'temple\1.xlsx')
workbook.close()
app.quit()
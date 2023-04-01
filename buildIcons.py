from PIL import Image


output_path = ".\\src\\static\\ico"

output_size = [
    {
        "size": 16,
        "names": [
            "icon_x16",
            "maskable_icon_x16"
        ]
    },
    {
        "size": 32,
        "names": [
            "icon_x32",
            "maskable_icon_x32"
        ]
    },
    {
        "size": 48,
        "names": [
            "icon_x48",
            "maskable_icon_x48"
        ]
    },
    {
        "size": 72,
        "names": [
            "icon_x72",
            "maskable_icon_x72"
        ]
    },
    {
        "size": 96,
        "names": [
            "icon_x96",
            "maskable_icon_x96"
        ]
    },
    {
        "size": 128,
        "names": [
            "icon_x128",
            "maskable_icon_x128"
        ]
    },
    {
        "size": 192,
        "names": [
            "icon_x192",
            "maskable_icon_x192"
        ]
    },
    {
        "size": 384,
        "names": [
            "icon_x384",
            "maskable_icon_x384"
        ]
    },
    {
        "size": 512,
        "names": [
            "icon_x512",
            "maskable_icon_x512",
            "maskable_icon"
        ]
    },
    {
        "size": 1024,
        "names": [
            "icon-1024x1024"
        ]
    },
    {
        "size": 152,
        "names": [
            "apple-touch-icon-152x152"
        ]
    },
    {
        "size": 144,
        "names": [
            "msapplication-icon-144x144.png"
        ]
    }
]

# 读取图片
origin_img = Image.open("./src/icon.png")
# img_deal = origin_img.resize((300,300),Image.ANTIALIAS) # 转化图片
for img in output_size:
    size = img["size"]
    names = img['names']
    target = origin_img.resize((size, size), Image.ANTIALIAS)
    for name in names:
        target.save(output_path + "\\" + name + '.png')

$(document).on("click", ".G-upload-con .choice-file", function () {
    var fileEl = $(this),
     faEl = fileEl.parents(".G-upload-con"),
     limitSize = Number(faEl.data("limitsize")),
     limitHight =  Number(faEl.data("limithight")),
     limitWidth =  Number(faEl.data("limitwidth")),
     limitNum =  Number(faEl.data("limitnum")),
     inputName =  Number(faEl.data("name")),
     limitType = false
     limitHight > 0 ? limitType = true : "";

    if (typeof FileReader == "undefind") {
        faEl.InnerHTML = "<p>你的浏览器不支持FileReader接口！</p>";
        fileEl.setAttribute("disabled", "disabled");
    }
    if (fileEl) {
        fileEl[0].onchange = function () {
            //检验是否为图像文件
            var changeResult = fileEl[0].files[0];
            if (changeResult.size >= 1024 * 1024 * limitSize && limitSize > 0) {
                alert("图片大小不能超过" + limitSize + "M！")
                return false;
            }
            if (!/image\/\w+/.test(changeResult.type)) {
                alert("请上传图片")
                return false;
            }
            var reader = new FileReader();
            reader.readAsDataURL(changeResult);
            reader.onload = function (e) {
                var img = new Image;
                img.src = this.result;
                img.onload = function () {
                    var imgEl = "<div class=G-img-item > <img src=" + img.src +
                        "> <p class=G-img-delete>删除</p> <input type=hidden name = "+ inputName +" value=" +
                        img.src + "> </div>";
                    //判断是否限制大小
                    if (limitType && (img.width != limitWidth || img.height != limitHight)) { //限制大小
                        alert("请上传" + limitWidth + "*" + limitHight + "像素的图片")
                        return false;
                    } else { //不限制大小
                        $(".G-img-add").before(imgEl);
                        fileEl.replaceWith(fileEl.val("").clone(true))
                    }
                    //是否限制图片数量
                    if( limitNum == faEl.find(".G-img-item").length ){
                        faEl.find(".G-img-add").hide()
                    }
                }
            }
        }
    }
})

$(document).on("click", ".G-upload-con .G-img-delete", function () {
    var th = $(this)
    th.parents(".G-upload-con").find(".G-img-add").show()
    th.parents(".G-img-item").remove();
})

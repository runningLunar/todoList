var taskList;

var $submit = $('#btn'),
    $task = $('#task'),
    $list = $('#taskList'),
    $detail_box = $('#detail-box'),
    $rewrite = $detail_box.find('#reWrite'),
    $h = $detail_box.find('h3');




//启动时初始化一次
window.onload = function () {
    init();
}


/*---------------------提交事件 开始----------------------------*/
$submit.click(function (e) {
    e.preventDefault();
    if($task.val()==''){
        return;
    }
    taskList.push({
        'finished':false,
        'value':$task.val(),
        'time':'',
        'detail':''
    });
    $task.val('');
    store.set('taskList',taskList);
    init();
})
/*---------------------提交事件 结束----------------------------*/

function creatHTML() {
    taskList = store.get('taskList') || [];
    var str = '';
    for(var i = 0; i<taskList.length; i++){
        str += '<li><input class="if-fin" type="checkbox" '+(taskList[i].finished? "checked" : "")+'><span>'+taskList[i].value+'</span><a class="more">详细</a><a class="del">删除</a></li>'
    }
    $list.html(str);
}

/*---------------------绑定删除按钮 开始----------------------------*/
function bindDel() {
    $('.del').click(function () {
        var index = $(this).parent().index();
        console.log(index);
        taskList.splice(index,1);
        store.set('taskList',taskList);
        init();
    })
}
/*---------------------绑定删除按钮 结束----------------------------*/

/*---------------------详细页面 开始----------------------------*/
function bindDetail() {
    $('.more').click(function () {

        //先给详细页面定位
        $detail_box.attr('style','left: ' + $('#box').offset().left + 'px; top: ' + $('#box').offset().top + 'px;');

        var index = $(this).parent().index();
        $h.html(taskList[index].value);
        $('#task-name').val(taskList[index].value);
        $('#task-time').val(taskList[index].time);
        $('#task-detail').val(taskList[index].detail);
        $('#curtain,#detail-box').show();

        $h.dblclick(setName);
        $('#task-name').focusout(reSet);
        //更新数据
        $rewrite.click(function (e) {
            e.preventDefault();
            var newObj = {
                'finished':taskList[index].finished,
                'value':$('#task-name').val(),
                'time':$('#task-time').val(),
                'detail':$('#task-detail').val()
            }
            taskList[index] = newObj;
            store.set('taskList',taskList);
            init();
            close();
        })

        //关闭详细页面
        $('.close,#curtain').click(close)
    })
}
//关闭详细栏
function close() {
    $('#curtain,#detail-box').hide();
}
//可以设置名字
function setName() {
    $h.hide();
    $('#change-name').show();
    $('#task-name').focus();
}
//回到h3
function reSet() {
    $h.show();
    $h.html($('#task-name').val());
    $('#change-name').hide();
}
/*---------------------详细页面 结束----------------------------*/

//完成按钮
function bindFin() {
    $('.if-fin').change(function () {
        var index = $(this).parent().index();
        taskList[index].finished = this.checked;
        store.set('taskList',taskList);
        init();
    })
}


//重新加载
function init() {
    creatHTML();
    bindDel();
    bindDetail();
    bindFin();
}
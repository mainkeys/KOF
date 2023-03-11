let AC_GAME_OBJECTS = [];

class AcGameObject {
    constructor() {
        AC_GAME_OBJECTS.push(this);

        this.timedelta = 0;//记录每两帧之间的时间间隔，单位为毫秒
        this.has_call_start = false;// 判断一开始有没有执行过
    }

    start() {  // 初始执行一次, 执行初始化，第一帧执行

    }

    update() {  // 每一帧执行一次（除了第一帧以外）

    }

    destroy() {  // 删除当前对象， 本项目用不到
        for (let i in AC_GAME_OBJECTS) {
            if (AC_GAME_OBJECTS[i] === this) {//如果等于当前元素就删除
                AC_GAME_OBJECTS.splice(i, 1); //从i开始，删除1个
                break;
            }
        }
    }
}


let last_timestamp;//记录上一帧时刻，上一帧在什么时候执行的

let AC_GAME_OBJECTS_FRAME = (timestamp) => {  //传入一个参数时间戳
    for (let obj of AC_GAME_OBJECTS) {//of枚举值， in枚举下标
        if (!obj.has_call_start) {
            obj.start();//如果没执行过就执行start
            obj.has_call_start = true;
        } else {
            obj.timedelta = timestamp - last_timestamp;//如果执行过就执行update，每一帧都执行
            obj.update();
        }
    }

    last_timestamp = timestamp;
    requestAnimationFrame(AC_GAME_OBJECTS_FRAME);//requestAnimationFrame通过递归的方式执行
}

requestAnimationFrame(AC_GAME_OBJECTS_FRAME);

export {//将其export出来
    AcGameObject
}
//从键盘读取字符

export class Controller {
    constructor($canvas) {
        this.$canvas = $canvas;

        this.pressed_keys = new Set();//手动实现按住了哪个键，需要实现按住移动这个动作
        //使用集合的方式存下来，重复按很多次，Set可实现判重
        this.start();
    }

    start() {
        let outer = this;// 用到外面的this
        // this.$canvas.keydown(function (e) {
        //     outer.pressed_keys.add(e.key);
        //     console.log(e.key);
        // });

        this.$canvas.keydown(function (e) { //
            outer.pressed_keys.add(e.key);
        });

        this.$canvas.keyup(function (e) {
            outer.pressed_keys.delete(e.key);
        });
    }
}
import { AcGameObject } from '/static/js/ac_game_object/base.js';
import { Controller } from '/static/js/controller/base.js';


export class GameMap extends AcGameObject {
    constructor(root) {
        super();

        this.root = root;//将root存下来
        this.$canvas = $('<canvas width="1280" height="720" tabindex=0></canvas>');//JQurey语法糖， tabindex=0 聚焦
        this.ctx = this.$canvas[0].getContext('2d');//canvas标签是一个数组，将其取出来canvas的所有操作在ctx中执行
        this.root.$kof.append(this.$canvas);//将canvas加到kof里面
        this.$canvas.focus();//如果要让canvas获取输入，需要让其获得聚焦

        this.controller = new Controller(this.$canvas);//新建controller

        this.root.$kof.append($(`<div class="kof-head">
        <div class="kof-head-hp-0"><div><div></div></div></div>
        <div class="kof-head-timer">60</div>
        <div class="kof-head-hp-1"><div><div></div></div></div>
    </div>`));

        this.time_left = 60000;  // 单位：毫秒
        this.$timer = this.root.$kof.find(".kof-head-timer");
    }

    start() {

    }

    update() {//update一般不写逻辑，只写封装好的函数，除非逻辑特别短，避免屎山
        this.time_left -= this.timedelta;
        if (this.time_left < 0) {
            this.time_left = 0;

            let [a, b] = this.root.players;
            if (a.status !== 6 && b.status !== 6) {
                a.status = b.status = 6;
                a.frame_current_cnt = b.frame_current_cnt = 0;
                a.vx = b.vx = 0;
            }
        }

        this.$timer.text(parseInt(this.time_left / 1000));

        this.render();//每一帧执行渲染函数
    }

    render() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);//清空整个地图（0，0，this.ctx.canvas.width，this.ctx.canvas.height ）
        // this.ctx.fiilstyle = 'black';
        // this.ctx.fillReact(0, 0, this.$canvas.width(), this.canvas.height());
    }
}
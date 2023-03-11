import { Player } from '/static/js/player/base.js';
import { GIF } from '/static/js/utils/gif.js';

export class Kyo extends Player {//角色草剃京继承自Player
    constructor(root, info) {
        super(root, info);

        this.init_animations();
    }

    init_animations() {//初始一下动画
        let outer = this;//将init_animation的this存下来，方便在onload的function里使用
        let offsets = [0, -22, -22, -140, 0, 0, 0];

        for (let i = 0; i < 7; i++) {//参考stackoverflow帖子的写法
            let gif = GIF();
            gif.load(`/static/images/player/kyo/${i}.gif`);
            //将GIF加到
            this.animations.set(i, {
                gif: gif,
                frame_cnt: 0,  // 总图片数， 多少帧
                frame_rate: 5,  // 每5帧过度一次， 每秒刷帧速率
                offset_y: offsets[i],  // y方向偏移量， 
                loaded: false,  // 是否加载完整
                scale: 2,  // 放大多少倍
            });

            //当图片加载完
            gif.onload = function () {
                let obj = outer.animations.get(i);
                obj.frame_cnt = gif.frames.length;
                obj.loaded = true;

                if (i === 3) {
                    obj.frame_rate = 4;
                }
            }
        }
    }
}
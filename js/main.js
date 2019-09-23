var canvasData = {
    width: 750,
    height: 430,

};

function BusinessCard(props) {
    this.props = props;
    this.setProp = function (key,value) {
        this.props[key] = value;
    };
    this.props = {
        width:750,
        height:430,
        format:{
            fillStyle: 'transparent',
        },
        name: {
            text: 'Alexandru MARA',
            poz: [450, 175],
            color: '#EC9A29',
            fontSize:'50px'
        },
        job: {
            text: 'web DEV',
            poz: [510, 215 ],
            color: '#EC9A29'
        },
        phone: {
            text: 'Tel: 0748 920 XXX',
            poz: [470, 415],
            color: '#EC9A29'
        },
        email: {
            text: 'mara.alex@ymail.com',
            poz: [30, 415],
            color: '#EC9A29'
        },
    };
    this.render = function(ctx){
        ctx.clearRect(0, 0, canvasData.width, canvasData.height);

        ctx.font = "30px Arial";
        for (apply in this.props.format) {
            ctx[apply] = this.props.format[apply];
            ctx.fillRect(0,0,this.props.width,this.props.height);

            console.log("apply" + apply);

        }
        var img = document.getElementById("logo");
        ctx.drawImage(img,-50, -50);
        for(i in this.props) {
                if(['width','height','format'].indexOf(i) < 0 ) {

                    ctx.fillStyle = (this.props[i].color != "" ? this.props[i].color : "#000000");
                    ctx.fillText(this.props[i].text, ...this.props[i].poz);
                }

        }


    }
}
var card = new BusinessCard({});

document.addEventListener("DOMContentLoaded", function event() {
    var menuItems = document.querySelectorAll(".menu__item");
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    ctx.save();
    card.render(ctx);


    var pixelConvert = 75;
    Array.from(menuItems).forEach(function (element) {
        element.addEventListener("click", function (event) {
            this.nextElementSibling.classList.toggle('hidden')
        });
    })

    Array.from(document.querySelectorAll('.operate')).forEach(function(element){
        element.addEventListener("click",function (event) {
            var width = parseFloat(this.dataset.width);
            var height = Math.round(parseFloat(this.dataset.width/this.dataset.ratio)*10)/10;
            canvas.height = height*pixelConvert;
            canvas.width = width*pixelConvert;
            canvasData.height = canvas.height;
            canvasData.width = canvas.width;
            console.log(width,height)
        });
    });

    Array.from(document.querySelectorAll('.canvas-input')).forEach(function(element){
        element.addEventListener("change",function (event) {
            var canvasSetup = {
                'name':[325,150],
                'job' :[500,300],
                'phone':[550,300],
                'email':[250,300],
            };
            ctx.clearRect(0, 0, canvasData.width, canvasData.height);
            ctx.restore();
            ctx.font = "30px Arial";
            useVals = card.props[this.dataset.target];
            useVals.text = this.value;
            card.setProp(this.dataset.target,useVals);
            card.render(ctx);
        });
    });

    var mod = document.querySelectorAll('.modifiers');

    mod.forEach(function (el) {
        el.addEventListener('keyup', function (ev) {
            var key = this.dataset.parent;
            var change = this.dataset.change;
            var oldVals = card.props[key];
            oldVals[change] = this.value;
            card.setProp(key,oldVals);
            card.render(ctx);

        })
    })




});
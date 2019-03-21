import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.less';

class Picture extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    hasClass = (node, cls) => {
        const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        return node.className.match(reg);
    }

    removeClass = (node, cls) => {
        if (this.hasClass(node, cls)) {
            const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            node.className = node.className.replace(reg, ' ');
        }
    }

    addClass = (node, cls) => {
        if (!this.hasClass(node, cls)) {
            node.className += ' ' + cls;
        }
    }

    animate = (node, firstRect, lastRect) => {
        node.animate([
            {
                transform: `
  translateX(${firstRect.left - lastRect.left}px)
  translateY(${firstRect.top - lastRect.top}px)
  scale(${firstRect.width / lastRect.width})
`
            },
            {
                transform: `
  translateX(0)
  translateY(0)
  scale(1)
 `
            }
        ], {
            duration: 600,
            easing: 'cubic-bezier(0.2, 0, 0.2, 1)'
        });
    }

    openDetail = (e) => {
        const node = e.target;
        if (node.nodeName === 'IMG') {
            console.log(this.refs);
            const detailBox = this.refs.detail;
            const detailImg = this.refs.detailImg;

            // 去掉详情隐藏，隐藏列表图片
            this.removeClass(detailBox, 'hide');
            this.addClass(node, 'imageSelected');
            node.style.opacity = 0;
            detailImg.src = node.src;


            // 开始动画
            let firstRect = node.getBoundingClientRect();
            let lastRect = detailBox.getBoundingClientRect();

            // 计算出初始位置
            console.log('firstRect', firstRect);
            console.log('lastRect', lastRect);
            console.log('translateX', (firstRect.left - lastRect.left));
            console.log('translateY', (firstRect.top - lastRect.top));
            console.log('scale', (firstRect.width / lastRect.width));

            this.animate(detailBox, firstRect, lastRect);
        }
    }

    closeDetail = (e) => {
        const detailBox = this.detail;
        const detailImg = this.refs.detailImg;
        const imageBox = document.querySelector('.imgShow-list .imageSelected');

        let firstRect = detailBox.getBoundingClientRect();
        let lastRect = imageBox.getBoundingClientRect();

        imageBox.style.opacity = 1;
        this.addClass(detailBox, 'hide');
        detailImg.src = '';
        this.removeClass(imageBox, 'imageSelected');

        this.animate(imageBox, firstRect, lastRect);
    }

    render() {
        return <section className = {styles.imgShow}>
            <div className="box imgShow-list" onClick = { this.openDetail }>
                <div className="item" >
                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/181794/kl-owl.png" alt="" />
                </div>
                <div className="item" >
                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/181794/kl-owl.png" alt="" />
                </div>
                <div className="item" >
                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/181794/kl-owl.png" alt="" />
                </div>
            </div>
            <div className="box imgShow-detail hide" ref = { (el) => this._detail = el } onClick = { this.closeDetail }>
                <div className="detail">
                    <img ref = 'detailImg' src = '' alt=""/>
                    <div className="content">
                        <div className="title">Great Horned Owl</div>
                        <div className="creator">Krystine Lopez</div>
                        <div className="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus, blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio, fugit, quas ipsa impedit.</div>
                    </div>
                </div>
            </div>
        </section>;
    }
}

Picture.PropTypes = {
    list: PropTypes.any
};

export default Picture;

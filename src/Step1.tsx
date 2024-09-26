import "./App.css";
import lessStyle from "./app.less";
import scssStyle from "./app.scss";
import smallImg from "@/assets/images/5kb_img.jpeg";
import bigImg from "@/assets/images/10kb_img.png";
function Step1() {
  return (
    <div>
      <div className={lessStyle.lessBox}>
        <h2>lessBox</h2>
        <img
          src={smallImg}
          alt="小于10kb的图片"
        />
        <img
          src={bigImg}
          alt="大于于10kb的图片"
        />
        <div className={lessStyle.smallImg}>小图片背景</div>
        <div className={lessStyle.bigImg}>
          大图片背景
          <span
            className="iconfont icon-RainColorOff"
            style={{ fontSize: 18 }}
          ></span>
        </div>
      </div>
      <div className={scssStyle["scssBox"]}>
        <h2>lessBox</h2>
      </div>
    </div>
  );
}

export default Step1;

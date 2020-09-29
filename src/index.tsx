import { Component, h, render } from 'preact'
import { getLastOpenFormClipboard, isValidKey, setLastOpenFormClipboard, tryReadValidKeyFromClipboard } from "./utils";
import { convertByMyApi, convertByTaokoulingApi } from "./api";


interface AppState {
    input: string,
    imgSrc: string,
    title: string,
    directOpen: boolean,
    readFromClipboard: boolean;
    openUrl: string;
}


class App extends Component<{}, AppState> {
    constructor (props) {
        super(props);
        this.state = {
            input: '',
            imgSrc: '',
            title: '',
            openUrl: '',
            directOpen: true,
            readFromClipboard: true,
        }
    }

    componentDidMount () {
        if (+localStorage.readFromClipboard) {
            return this.PasteAndResolve(true);
        }
    }

    resolve = async () => {

        this.setState({
            imgSrc: '',
            title: '',
        });
        const {input} = this.state;
        if (!isValidKey(input)) {
            alert('这不是淘口令吧?')
            return false;
        }
        let {res, err} = await convertByMyApi(input);
        if (err) {
            return this.fallback();
        }
        this.setState({
            title: res.coupon_info
        })
        this.afterResolve(res.coupon_click_url);
        return true;
    }

    fallback = async () => {
        let {res, err} = await convertByTaokoulingApi(this.state.input);
        if (err) {
            alert('解析失败');
            return false;
        }
        this.setState({
            title: res.content,
            imgSrc: res.picUrl
        })
        this.afterResolve(res.url);
        return true;

    }
    afterResolve = (url) => {
        if (+localStorage.directOpen) {
            window.open(url);
        }
        this.setState({openUrl: url})
    }

    onClickResolve = async () => {
        return this.resolve();
    }
    onClickPasteAndResolve = () => {
        return this.PasteAndResolve(false);
    }
    PasteAndResolve = async (autoOpen: boolean) => {
        console.log('读取剪贴板', {autoOpen})
        let key = tryReadValidKeyFromClipboard();
        if (!key) {
            return false;
        }
        if (autoOpen && key == getLastOpenFormClipboard()) {
            setLastOpenFormClipboard('');
            return;
        }
        console.log('从剪贴板读取到了合适的淘口令 解析中', key);
        await new Promise((res) => {
            this.setState({input: key}, () => {
                res();
            })
        });
        let success = await this.resolve();
        if (success) {
            setLastOpenFormClipboard(key);
        }

    }
    openLink = () => {
        window.open(this.state.openUrl);
    }

    render () {
        return (
            <div className='content'>
                <input type="text" id="inputKey" value={this.state.input} onInput={(e) => {
                    console.log(e)
                    this.setState({input: e.currentTarget.value})
                }}/>
                <div className="btn-area">
                    <button id='resolveBtn' onClick={this.onClickPasteAndResolve}>
                        粘贴并解析
                    </button>
                    <button id='resolveBtn' onClick={this.onClickResolve}>
                        解析
                    </button>
                </div>
                <div style={{display: (this.state.imgSrc || this.state.title) ? 'block' : 'none'}}>
                    <img height="180" width="180" src={this.state.imgSrc} alt="" id="img"/>
                    <div id="title">{this.state.title}</div>
                    <button id="openBtn" onClick={this.openLink}>
                        打开连接
                    </button>
                </div>
                <div className="checkbox-group">
                    <div onClick={() => {
                        localStorage.readFromClipboard = +!+localStorage.readFromClipboard;
                        this.forceUpdate();
                    }}><label htmlFor="readClipboard"> 从剪贴板读取</label>
                        <input type="checkbox"
                               checked={Boolean(+localStorage.readFromClipboard)}
                        />
                    </div>
                    <div onClick={() => {
                        localStorage.directOpen = +!+localStorage.directOpen;
                        this.forceUpdate();
                    }}><label htmlFor="directOpen"> 直接打开
                    </label>
                        <input checked={Boolean(+localStorage.directOpen)}
                               type="checkbox"
                        />
                    </div>
                </div>

            </div>
        );
    }
}


render(
    <App/>,
    document.getElementById('root')
)



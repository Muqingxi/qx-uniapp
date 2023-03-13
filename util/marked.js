// 引入依赖
import { marked } from "marked";
import hljs from "highlight.js/lib/core";

// 引入样式
import "highlight.js/styles/kimbie-light.css";

// 引入需要的相关语言包
import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
import json from 'highlight.js/lib/languages/json';
import typescript from 'highlight.js/lib/languages/typescript';

// 语言包需要注册
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('css', css);
hljs.registerLanguage('json', json);
hljs.registerLanguage('typescript', typescript);

export default (code, lang) => {
	const renderer = new marked.Renderer()
	renderer.code = (code, language) => {
		// 写法:'```javascript\nlet a = 1\n```',language可以拿到javascript
	    let hled = hljs.highlight(lang, code).value
		return `<pre class="hljs"><code class="${lang}">${hled}</code></pre>`
	}
	// 配置 marked 的 options
	marked.setOptions({
	  renderer
	})
	return marked(code)
}

import CodeMirror from '@uiw/react-codemirror';
import CodeOutput from "./CodeOutput";
import EditorWindow from "./EditorWindow";
import Panel from  "./Panel";
// import './codeEditor.css'

function CodeEditor() {

    return (
        <div >
            <EditorWindow/>
            <Panel/>
            <CodeOutput/>
        </div>
    );
}

export default CodeEditor;
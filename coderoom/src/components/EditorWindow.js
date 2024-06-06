import { useEffect, useState, useRef, useContext } from "react";
import CodeMirror from '@uiw/react-codemirror';
import { CodeEditorContext } from "../provider/codeEditorProvider";
import Select from "react-select";
import { loadLanguage } from '@uiw/codemirror-extensions-langs';




function EditorWindow()
{
    const languages = [
        { value: "c", label: "C" },
        { value: "cpp", label: "C++" },
        { value: "python", label: "Python" },
        { value: "java", label: "Java" },
        { value: "javascript", label:"Javascript"}
    ];

    const { language, setLanguage ,code,setCode, socket}=useContext(CodeEditorContext);
    console.log(socket.id);

    const handleCodeChange = (newCode) => {
        setCode(newCode);
        // console.log("codechange emitting",code);
        socket.emit('codeChange', newCode);
    };

    useEffect(() => {
        socket.on('codeChange', (newCode) => {
            // console.log("codechange processed",code);
            setCode(newCode);
        });
        socket.on('languageChange',(lang)=>{
            console.log("changing language");
            setLanguage(lang);
        })
    }, []);

    const handleLangChange=(e)=>{
        setLanguage(e.value);
        socket.emit("languageChange",e.value);
    }

    return(
        <div>
            <div style={{ width: "30%", marginBottom: '5px' }}>
                <Select                    
                    options={languages} value={language}
                    onChange={handleLangChange}
                    placeholder={language} 
                />

            </div>
            <CodeMirror
                style={{ fontSize: "32px", textAlign: "left" }}
                value={code}
                onChange={handleCodeChange}
                height="60vh"
                width="60vw"
                theme={'dark'}
                extensions={[[loadLanguage(language)]]}
            />

        </div>

    )

}

export default EditorWindow;
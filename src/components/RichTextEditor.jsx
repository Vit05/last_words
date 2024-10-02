import React, {useEffect, useRef, useState} from 'react';
import {Paper, Typography, Button, Box} from '@mui/material';
import 'react-quill/dist/quill.snow.css'; // import styles for react-quill
import ReactQuill from 'react-quill-new';

const RichTextEditor = ({existingWill, handleWill}) => {
    const [editorContent, setEditorContent] = useState(existingWill);
    const [isFocused, setIsFocused] = useState(false);
    const quillRef = useRef(null);


    const handleEditorChange = (content) => {
        setEditorContent(content);
        setIsFocused(true)
    };

    // Handle when the editor gains focus
    const handleFocus = () => {
        console.log("focused")
        setIsFocused(true);
    };

    const handleSave = () => {
        handleWill(editorContent, true)
        setIsFocused(false)
    };
    useEffect(() => {
        handleWill(editorContent, false)
    }, [editorContent])

    useEffect(() => {
        setIsFocused(false)
    }, [])


    return (
        <>
           <Box>
               <ReactQuill
                   ref={quillRef}
                   value={editorContent}
                   onChange={handleEditorChange}
                   onFocus={handleFocus}
                   style={{ height: '300px', marginBottom: '40px' }}
               />
           </Box>

            {isFocused && <Box sx={{ paddingTop: 3 }}>
                <Button variant="contained" color="primary" onClick={handleSave}>
                Save
            </Button>
            </Box>}
        </>
    );
};

export default RichTextEditor;

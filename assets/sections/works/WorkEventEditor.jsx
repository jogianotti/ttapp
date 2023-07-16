import React, {useRef, useState} from 'react';
import {Editor} from '@tinymce/tinymce-react';
import {Button} from "@mui/material";

// TinyMCE so the global var exists
// eslint-disable-next-line no-unused-vars
import tinymce from 'tinymce/tinymce';
// DOM model
import 'tinymce/models/dom/model'
// Theme
import 'tinymce/themes/silver';
// Toolbar icons
import 'tinymce/icons/default';
// Editor styles
import 'tinymce/skins/ui/oxide/skin.min.css';

// importing the plugin js.
// if you use a plugin that is not listed here the editor will fail to load
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/autoresize';
import 'tinymce/plugins/autosave';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/code';
import 'tinymce/plugins/codesample';
import 'tinymce/plugins/directionality';
import 'tinymce/plugins/emoticons';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/help';
import 'tinymce/plugins/image';
import 'tinymce/plugins/importcss';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/link';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/media';
import 'tinymce/plugins/nonbreaking';
import 'tinymce/plugins/pagebreak';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/quickbars';
import 'tinymce/plugins/save';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/table';
import 'tinymce/plugins/template';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/visualchars';
import 'tinymce/plugins/wordcount';

// importing plugin resources
import 'tinymce/plugins/emoticons/js/emojis';

// Content styles, including inline UI like fake cursors
/* eslint import/no-webpack-loader-syntax: off */
import contentCss from '!!raw-loader!tinymce/skins/content/default/content.min.css';
import contentUiCss from '!!raw-loader!tinymce/skins/ui/oxide/content.min.css';
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export function WorkEventEditor({client, work, onRegister}) {
    const t = tinymce;
    const editorRef = useRef(null);
    const save = (e) => {
        e.preventDefault();

        fetch(`/admin/works/${client}/${work}/events/new`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                date: dateSelectedYear+'-'+dateSelectedMonth+'-'+dateSelectedDay,
                content: editorRef.current.getContent()
            })
        })
            .then(response => response.json())
            .then(async (data) => {
                onRegister();
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };
    const [dateSelectedYear, setDateSelectedYear] = useState('');
    const [dateSelectedMonth, setDateSelectedMonth] = useState('');
    const [dateSelectedDay, setDateSelectedDay] = useState('');

    const handleDateChange = (selectedDate) => {
        setDateSelectedYear(dayjs(selectedDate).format('YYYY'));
        setDateSelectedMonth(dayjs(selectedDate).format('MM'));
        setDateSelectedDay(dayjs(selectedDate).format('DD'));
    };

    return (
        <>
            <h6>Fecha</h6>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                <DatePicker onChange={handleDateChange}/>
            </LocalizationProvider>
            <br/>
            <br/>
            <h6>Contenido</h6>
            <Editor
                IAllProps
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue=""
                init={{
                    height: 250,
                    menubar: false,
                    skin: false,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor',
                        'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'wordcount', 'image'
                    ],
                    toolbar: 'image | formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent',
                    content_css: false,
                    content_style: [contentCss, contentUiCss, 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'].join('\n'),
                    images_upload_url: `/admin/works/${client}/${work}/events/upload_image`
                }}
            />
            <br/>
            <Button onClick={save} variant="contained">REGISTRAR</Button>
        </>
    );
}

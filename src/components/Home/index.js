
import React, { useState } from 'react';
import './index.css';
import { FaFileWord, FaCopyright , FaUnderline ,FaItalic} from 'react-icons/fa';
import { PiTextUnderlineFill,PiTextItalicFill } from "react-icons/pi";
import { ImBold } from "react-icons/im"
import { FiSlack, FiBold } from "react-icons/fi";

const Home = () => {
    const [text, setText] = useState('');
    const [searchText, setsearchText] = useState('');
    const [replaceText, setreplaceText] = useState('');
    const [highlightedText, setHighlightedText] = useState('');
    const [features,setFeatures]=useState({bold:false,underline:false,style:false})
    //  unique words
    const getUniqueWordsCount = (text) => {
        const words = text.toLowerCase().match(/\b\w+\b/g);
        const uniqueWords = new Set(words);
        return uniqueWords ? uniqueWords.size : 0;
    };

    //  count characters
    const getCharacterCount = (text) => {
        return text.replace(/[^\w]/g, '').length;
    };


    const handleReplaceAll = () => {
        if (!searchText || !replaceText) return;

        //  highlighted replaceText
        const newText = text.replaceAll(
            searchText,
            `<span class="highlight">${replaceText}</span>`
        );
        setHighlightedText(newText);
        setText(text.replaceAll(searchText, replaceText));
        setsearchText('');
        setreplaceText('');
    };

    const handleTextChange = (e) => {
        setText(e.target.value);
        setHighlightedText(e.target.value);
    };
    const changeBold = () => {
        setFeatures(prevFeatures => ({
            ...prevFeatures, 
            bold: !prevFeatures.bold 
        }));
    };
    const changeUnderline= () => {
        setFeatures(prevFeatures => ({
            ...prevFeatures, 
            underline: !prevFeatures.underline 
        }));
    };
    const changestyle = () => {
        setFeatures(prevFeatures => ({
            ...prevFeatures, 
            style: !prevFeatures.style 
        }));
    };
  
    return (
        <div className="home-container">
            <h1 className="title">Real-Time Text Analysis</h1>

            <div className="toolbar">
                <div className="toolbar-item">
                    <FaFileWord className="icon" />
                    <p className='paragraph'>Unique Words: {getUniqueWordsCount(text)}</p>
                </div>
                <div className="toolbar-item">
                    < FaCopyright className="icon" />
                    <p className='paragraph'>Character Count: {getCharacterCount(text)}</p>
                </div>

                <div className='toolbar-side'>
                    <div className="toolbar-item"  onClick={changeBold}>
                        {features.bold?( <ImBold className="icon"/>):(<  FiBold className="icon"/>)}
                    </div>
                    <div className="toolbar-item" onClick={changeUnderline}>
                    {features.underline?( < FaUnderline className="icon"/>):(<  PiTextUnderlineFill className="icon"/>)}
                    </div>
                    <div className="toolbar-item" onClick={changestyle}>
                    {features.style?( < FaItalic className="icon"/>):(< PiTextItalicFill className="icon"/>)}
                    </div>

                </div>


            </div>

            <textarea
                rows="10"
                cols="40"
                value={text}
                onChange={handleTextChange}
                placeholder="Type something here..."
                className={`text-input ${features.bold ? 'bold' : ''}  ${features.underline ? 'underline' : ''} 
                ${features.style ? 'style' : ''}   ` } 
            />

            <div
                className="editable"
                dangerouslySetInnerHTML={{ __html: highlightedText }}
            />

            <div className="replace-section">
                <input
                    type="text"
                    placeholder="Search Text"
                    value={searchText}
                    onChange={(e) => setsearchText(e.target.value)}
                    className="input-field "
                    
                />
                <input
                    type="text"
                    placeholder="Replaceing Text"
                    value={replaceText}
                    onChange={(e) => setreplaceText(e.target.value)}
                    className="input-field"
                />
                <button className="replace-btn" onClick={handleReplaceAll}>
                    <FiSlack className="icon" /> Replace All
                </button>
            </div>
        </div>
    );
};

export default Home;

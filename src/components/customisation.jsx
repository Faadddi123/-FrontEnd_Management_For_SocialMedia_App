import React, { useState } from 'react';
import { useThemeModal } from '../context/thememodal';





function CustomizeTheme() {
    
    const [activeFontSize, setActiveFontSize] = useState('font-size-2');
    const [activeColor, setActiveColor] = useState('color-1');
    const [activeBackground, setActiveBackground] = useState('bg-1');
    // i got this from the original js of the template 
    const fontSize = document.querySelectorAll('.choose-size span');
    var root = document.querySelector(':root');
    const colorPalette = document.querySelectorAll('.choose-color span');
    const Bg1 = document.querySelector('.bg-1');
    // const themeModal = document.querySelector('.customize-theme');
    const Bg2 = document.querySelector('.bg-2');
    const Bg3 = document.querySelector('.bg-3');
// ============== THEME / DISPLAY CUSTOMIZATION ============== 

const { isModalOpen, closeModal } = useThemeModal();



// ============== FONT SIZE ============== 

// remove active class from spans or font size selectors
const removeSizeSelectors = () => {
    fontSize.forEach(size => {
        size.classList.remove('active');
    })
}

fontSize.forEach(size => { 
   size.addEventListener('click', () => {
        removeSizeSelectors();
        let fontSize;
        size.classList.toggle('active');

        if(size.classList.contains('font-size-1')) { 
            fontSize = '10px';
            root.style.setProperty('----sticky-top-left', '5.4rem');
            root.style.setProperty('----sticky-top-right', '5.4rem');
        } else if(size.classList.contains('font-size-2')) { 
            fontSize = '13px';
            root.style.setProperty('----sticky-top-left', '5.4rem');
            root.style.setProperty('----sticky-top-right', '-7rem');
        } else if(size.classList.contains('font-size-3')) {
            fontSize = '16px';
            root.style.setProperty('----sticky-top-left', '-2rem');
            root.style.setProperty('----sticky-top-right', '-17rem');
        } else if(size.classList.contains('font-size-4')) {
            fontSize = '19px';
            root.style.setProperty('----sticky-top-left', '-5rem');
            root.style.setProperty('----sticky-top-right', '-25rem');
        } else if(size.classList.contains('font-size-5')) {
            fontSize = '22px';
            root.style.setProperty('----sticky-top-left', '-12rem');
            root.style.setProperty('----sticky-top-right', '-35rem');
        }

        // change font size of the root html element
        document.querySelector('html').style.fontSize = fontSize;
   })
})

// Remove active class from colors
const changeActiveColorClass = () => {
    colorPalette.forEach(colorPicker => {
        colorPicker.classList.remove('active');
    })
}
const closeThemeModal = (e) => {
    if(isModalOpen){
        // console.log("test" , isModalOpen , e.target.classList);
        if (e.target.classList.contains('card')) {
            // console.log('hhh');
            closeModal();
        }
    }
}
document.addEventListener('click', closeThemeModal);
// Change color primary
colorPalette.forEach(color => {
    color.addEventListener('click', () => {
        let primary;
        changeActiveColorClass(); 

        if(color.classList.contains('color-1')) {
            primary = 252;
        } else if(color.classList.contains('color-2')) {
            primary = 52;
        } else if(color.classList.contains('color-3')) {
            primary = 352;
        } else if(color.classList.contains('color-4')) {
            primary = 152;
        } else if(color.classList.contains('color-5')) {
            primary = 202;
        }

        color.classList.add('active');
        root.style.setProperty('--primary-color-hue', primary);
    })
})

//Theme Background Values
let lightColorLightness;
let whiteColorLightness;
let darkColorLightness;

// Changes background color
const changeBG = () => {
    root.style.setProperty('--light-color-lightness', lightColorLightness);
    root.style.setProperty('--white-color-lightness', whiteColorLightness);
    root.style.setProperty('--dark-color-lightness', darkColorLightness);
}

document.addEventListener('click', function(event) {
    const target = event.target;
    if (target.matches('.bg-1')) {
        lightColorLightness = '95%'; // default value from CSS
        whiteColorLightness = '100%'; // default value from CSS
        darkColorLightness = '17%';
        target.classList.add('active');
        document.querySelector('.bg-2').classList.remove('active');
        document.querySelector('.bg-3').classList.remove('active');
        changeBG();
    } else if (target.matches('.bg-2')) {
        darkColorLightness = '95%';
        whiteColorLightness = '20%';
        lightColorLightness = '15%';
        target.classList.add('active');
        document.querySelector('.bg-1').classList.remove('active');
        document.querySelector('.bg-3').classList.remove('active');
        changeBG();
    } else if (target.matches('.bg-3')) {
        darkColorLightness = '95%';
        whiteColorLightness = '10%';
        lightColorLightness = '0%';
        target.classList.add('active');
        document.querySelector('.bg-1').classList.remove('active');
        document.querySelector('.bg-2').classList.remove('active');
        changeBG();
    }
});

    return (
        <div className="customize-theme" style={{ display: isModalOpen ? 'grid' : 'none' }} >
            <div className="card">
                <h2>Customize your view</h2>
                <p className="text-muted">Manage your font size, color, and background</p>

                <div className="font-size">
                    <h4>Font Size</h4>
                    <div>
                        <h6>Aa</h6>
                        <div className="choose-size">
                            {/* Example of handling click event to set active font size */}
                            <span className={`font-size-1 ${activeFontSize === 'font-size-1' ? 'active' : ''}`} onClick={() => setActiveFontSize('font-size-1')}></span>
                            <span className={`font-size-2 ${activeFontSize === 'font-size-2' ? 'active' : ''}`} onClick={() => setActiveFontSize('font-size-2')}></span>
                            <span className={`font-size-3 ${activeFontSize === 'font-size-3' ? 'active' : ''}`} onClick={() => setActiveFontSize('font-size-3')}></span>
                            <span className={`font-size-4 ${activeFontSize === 'font-size-4' ? 'active' : ''}`} onClick={() => setActiveFontSize('font-size-4')}></span>
                            <span className={`font-size-5 ${activeFontSize === 'font-size-5' ? 'active' : ''}`} onClick={() => setActiveFontSize('font-size-5')}></span>
                        </div>
                        <h3>Aa</h3>
                    </div>
                </div>

                <div className="color">
                    <h4>Color</h4>
                    <div className="choose-color">
                        {/* Similar handling for color selection */}
                        <span className={`color-1 ${activeColor === 'color-1' ? 'active' : ''}`} onClick={() => setActiveColor('color-1')}></span>
                        <span className={`color-2 ${activeColor === 'color-2' ? 'active' : ''}`} onClick={() => setActiveColor('color-2')}></span>
                        <span className={`color-3 ${activeColor === 'color-3' ? 'active' : ''}`} onClick={() => setActiveColor('color-3')}></span>
                        <span className={`color-4 ${activeColor === 'color-4' ? 'active' : ''}`} onClick={() => setActiveColor('color-4')}></span>
                        <span className={`color-5 ${activeColor === 'color-5' ? 'active' : ''}`} onClick={() => setActiveColor('color-5')}></span>
                    </div>
                </div>

                <div className="background">
                    <h4>Background</h4>
                    <div className="choose-bg">
                        <div className={`bg-1 ${activeBackground === 'bg-1' ? 'active' : ''}`} onClick={() => setActiveBackground('bg-1')}>
                            <span></span>
                            <h5>Light</h5>
                        </div>
                        <div className={`bg-2 ${activeBackground === 'bg-2' ? 'active' : ''}`} onClick={() => setActiveBackground('bg-2')}>
                            <span></span>
                            <h5>Dim</h5>
                        </div>
                        <div className={`bg-3 ${activeBackground === 'bg-3' ? 'active' : ''}`} onClick={() => setActiveBackground('bg-3')}>
                            <span></span>
                            <h5>Dark</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomizeTheme;
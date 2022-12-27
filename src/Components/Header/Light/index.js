import React, { useRef } from 'react';
 
import styled from 'styled-components';
import audioSrc from '../../../assets/images/video/click.mp3';

const LightStyle = styled.div`
    .light {
        transform: scale(0.4);
        position: fixed;
        left: 95%;
        top: 24%;
        z-index: 100;
        &__bulb {
            position: absolute;
            width: 80px;
            height: 80px;
            background: #8f8f8f;
            right: 50%;
            top: 23%;
            border-radius: 50%;
            z-index: 2;
            cursor: pointer;
            &:before {
                background: #8f8f8f;
                width: 35px;
                height: 80px;
                content: '';
                position: absolute;
                top: -50px;
                left: 22.5px;
                height: 80px;
                border-top: 30px solid #000;
                border-radius: 10px;
            }

            &:after {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 120px;
                height: 120px;
                background: #fff;
                border-radius: 50%;
                filter: blur(40px);
            }

            & span:nth-child(1) {
                top: -16px;
                position: absolute;
                left: -4px;
                display: block;
                width: 30px;
                height: 30px;
                background: transparent;
                transform: rotate(342deg);
                border-bottom-right-radius: 40px;
                box-shadow: 20px 20px 0 10px #8f8f8f;
            }
            & span:nth-child(2) {
                top: -16px;
                position: absolute;
                right: -4px;
                display: block;
                width: 30px;
                height: 30px;
                background: transparent;
                transform: rotate(16deg);
                border-bottom-left-radius: 40px;
                box-shadow: -20px 20px 0 10px #8f8f8f;
            }
        }
        &__wire {
            position: absolute;
            left: calc(50% - 41px);
            bottom: 50%;
            width: 4px;
            height: 60vh;
            background: #000;
            z-index: 1;
        }
    }

    #audio {
    }
`;
function Light(props) {
    const { handleChangeTheme } = props;

    const refAudio = useRef(null);
    const ref = useRef(null);
    const handleOnLight = () => {
        if (refAudio) {
            refAudio.current.play();
        }
        handleChangeTheme();
    };

    return (
        <LightStyle>
            <div className="light">
                <div className="light__wire"></div>
                <div className="light__bulb" onClick={handleOnLight}>
                    <span></span>
                    <span></span>
                </div>
                <audio
                    id="audio"
                    src={audioSrc}
                    autostart="false"
                    ref={refAudio}
                ></audio>
            </div>
        </LightStyle>
    );
}

Light.propTypes = {};

export default Light;

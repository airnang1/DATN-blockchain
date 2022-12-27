import React from 'react';
//  
import { Avatar } from 'antd';
import { humanImg } from '../../../assets/fake-data/human';
function AvatarInfo(props) {
    const { admin } = props;
    return (
        <div className="profile-sidebar">
            <div className="profile-userpic">
                <Avatar
                    src={admin.profilePicture || humanImg}
                    className="img-responsive"
                    alt=""
                />
            </div>
            <div className="profile-usertitle">
                <div className="profile-usertitle-name">{admin.username}</div>
                <div className="profile-usertitle-status">
                    <span className="indicator label-success" />
                    Online
                </div>
            </div>
            <div className="clear" />
        </div>
    );
}

AvatarInfo.propTypes = {};

export default AvatarInfo;

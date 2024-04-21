import React from 'react';

function timepassed(updated_at) {
    function getTimeAgoText(updatedTime) {
        const currentTime = new Date();
        const timeDifference = currentTime - new Date(updatedTime);
        const minutesAgo = Math.floor(timeDifference / 60000);
        if (minutesAgo > 60) {
            const hoursAgo = Math.floor(minutesAgo / 60);
            if (hoursAgo > 24) {
                const daysAgo = Math.floor(hoursAgo / 24);
                return `${daysAgo} days ago`;
            }
            return `${hoursAgo} hours ago`;
        }
        return `${minutesAgo} minutes ago`;
    }

    const timeAgoText = getTimeAgoText(updated_at.updated_at);

    return (
        <div className="text-muted h7 mb-2"> <i className="fa fa-clock-o"></i> {timeAgoText}</div>
    );
}

export default timepassed;
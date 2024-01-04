import React from 'react';

interface PopUpProps {
    trigger: boolean;
    handleCloseEvent: () => void;
    children: React.ReactNode;
}

const PopUp: React.FC<PopUpProps> = ({ trigger, handleCloseEvent, children }: PopUpProps) => {
    const handleContainerClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        if (handleCloseEvent) handleCloseEvent();
    };

    const handleChildClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
    };

    return (
        trigger && (
            <div
                onClick={handleContainerClick}
                className='fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-gray-700 bg-opacity-50 cursor-default backdrop-blur-sm'
            >
                <div onClick={handleChildClick}>{children}</div>
            </div>
        )
    );
};

export default PopUp;

type AnimatedButtonProps = {
    children?: React.ReactNode;
    className?: string;
    buttonClassName?: string;
};

export default function AnimatedButton({
    children = "Click Me",
    className = "",
    buttonClassName = "",
}: AnimatedButtonProps) {
    return (
        <>
            <style>{`
                @keyframes rotate {
                    100% {
                        transform: rotate(1turn);
                    }
                }

                .rainbow::before {
                    content: '';
                    position: absolute;
                    z-index: -2;
                    left: -50%;
                    top: -50%;
                    width: 200%;
                    height: 200%;
                    background-position: 100% 50%;
                    background-repeat: no-repeat;
                    background-size: 50% 30%;
                    filter: blur(6px);
                    background-image: linear-gradient(#FFF);
                    animation: rotate 4s linear infinite;
                }
            `}</style>
            <div className={`${className} flex bg-transparent rounded-full p-0.5 items-center justify-center`}>
                <div className="rainbow relative z-0 bg-white/15 overflow-hidden p-0.5 flex items-center justify-center rounded-full hover:scale-105 transition duration-300 active:scale-100">
                    <button className={`${buttonClassName} px-8 text-sm py-3 text-white rounded-full font-medium bg-gray-900/80 backdrop-blur`}>
                        {children}
                    </button>
                </div>
            </div>
        </>
    );
}

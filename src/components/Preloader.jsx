const Preloader = ({preloaded}) => (
    <div className={`fixed flex inset-0 after:absolute after:w-1/2 after:h-full after:bg-dark after:left-0 after:top-0 before:absolute before:w-1/2 before:h-full before:bg-dark before:right-0 before:top-0 ${preloaded ? "z-10 opacity-0 pointer-events-none after:animate-preloaded before:animate-preloaded":'z-50'}`}>
        <div className={`w-[1px] h-[250px] m-auto relative z-50 overflow-hidden duration-300 after:absolute after:w-full after:h-full after:bg-[#777] after:left-0 after:top-0 after:animate-lineround before:absolute before:w-full before:h-0 before:bg-white before:left-0 before:top-1/2 before:-translate-y-1/2 before:animate-lineheight ${preloaded ? "!h-full opacity-0 pointer-events-none after:opacity-0":""}`}/>
    </div>
)

export default Preloader;

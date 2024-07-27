import Timeline from '../../common/shared/Timeline/Timeline';
import BorderBar from '../../decoration/BorderBar';
import info from "./index";


export default function HowItWorksContent() {
    return(
        <section className='my-10 relative'>
          <div>
            <div className="absolute top-0 z-[-2] h-[100%] w-full bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]" />
                <BorderBar />
                <div >
                    <Timeline data={info} />
                </div>
                <BorderBar />
            </div>
        </section>
    );
}
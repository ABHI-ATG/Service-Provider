import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import SearchBar from "../SearchBar/SearchBar"

const slideImages = [
  {
    url:
      "banner2",
    discp1:"Quality home services,",
    discp2:"on demand",
    para1:"Experienced, hand-picked Professionals ",
    para2:"to serve you at your doorstep"

  },
  {
    url:
      "Electrician",
      discp1:"Professional. Friendly.",
      discp2:"Courteous.",
      para1:"You can fully rely on our proffesionals.",
      para2:"They are glad to help you with any renovation. "
  },
  {
    url:
      "cleaning",
      discp1:"We reimagined the home",
      discp2:"renovation  experience!",
  }
];

const Banner = () => {
  return (
    <Slide>
      {slideImages.map((slideImage, index) => (
        <div key={index}>
          <div className=" flex flex-wrap justify-center ">
            <div className=" flex justify-center w-1/2 ">
              <img src = {"images/" + slideImage.url + ".png"}
                className=" w-11/12"
                alt="banner"
              ></img>
            </div>
            <div>
              <h1
                className=" text-center mt-10 mb-6 text-7xl text-slate-800 font-bold  "
                style={{ fontFamily: "Bebas Neue" }}
              >
                SERVICELY
              </h1>
              <h2 className=" text-center mt-3  text-4xl text-slate-600 font-semibold ">
                {slideImage.discp1}
              </h2>
              <h2 className=" text-center  mb-7 text-4xl text-slate-600 font-semibold ">
                {slideImage.discp2}
              </h2>
              <h3 className=" text-center mt-3 text-2xl text-neutral-900 font-semibold ">
                {slideImage.para1}
              </h3>
              <h3 className=" text-center mb-8 text-2xl text-neutral-900 font-semibold ">
                {slideImage.para2}
              </h3>
              <form class="flex justify-center align-middle mt-5  ">
                <SearchBar/>
              </form>
            </div>
          </div>
        </div>
      ))}
    </Slide>
  );
};

export default Banner;

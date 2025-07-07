import ListYearbook from "./ListYearbook";

const Yearbook = ({ posts }) => {
  return (
    <>
      <div
        data-aos="fade-up"
        className="sectionPaddingX sectionPaddingB flex gap-10 max-lg:flex-col"
      >
        <div className={`flex flex-col gap-8 text-black lg:w-1/2 2xl:w-2/5`}>
          <div className="!text-left leading-tight xl:text-lg">
            Prirodnjački muzej je 2007. godine pokrenuo periodično izdanje
            GODIŠNJAK Prirodnjačkog muzeja. Sveske Godišnjaka izlaze jednom
            godišnje i sadrže neformalni pregled aktivnosti, događaja i
            rezultata rada u Muzeju tokom godinu dana. Pobrojane su izložbe i
            manifestacije za publiku, značajni predmeti koji su prinovljeni u
            zbirke, publikovani naučni radovi, značajni događaji u radu Muzeja i
            druge informacije.
            <br></br> <br />
            Godišnjak je moguće preuzeti u PDF formatu, počev od izdanja za
            2009. godinu.
          </div>
        </div>
      </div>
      <div data-aos="fade-up" className="bg-secondary">
        <div className="sectionPaddingX sectionPaddingY">
          <ListYearbook posts={posts} />
        </div>
      </div>
    </>
  );
};

export default Yearbook;

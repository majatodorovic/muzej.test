const SingleExhibition = () => {
  return (
    <div>
      <div className="min-w-[300px] space-y-5 bg-primary p-6 text-white">
        <div>
          <p className="font-semibold">Utorak – Nedelja: 10:00 – 21:00</p>
          <p className="text-sm">od 4. maja do 31. oktobra</p>
        </div>

        <div>
          <p className="font-semibold">Utorak – Nedelja: 10:00 – 18:00</p>
          <p className="text-sm">od 1. novembra do 30. aprila</p>
        </div>

        <div>
          <p className="italic">Četvrtkom ulaz slobodan</p>
          <p className="text-sm">u periodu 10:00 – 12:00</p>
        </div>
      </div>
    </div>
  );
};

export default SingleExhibition;

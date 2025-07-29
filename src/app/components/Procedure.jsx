import Card from "./Card";
import { stepsData } from "@/lib/stepsData";
export default function Procedure() {
  return (
    <>
      <div className="w-[80%] m-auto flex flex-col gap-4 my-4">
        <p className="text-3xl self-center font-medium">
          Get and share your study notes in easy way
        </p>
        <div className="flex justify-around flex-wrap gap-2.5">
          {stepsData.map((step) => (
            <Card key={step.id} step={step} />
          ))}
        </div>
      </div>
    </>
  );
}

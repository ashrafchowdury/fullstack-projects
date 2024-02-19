import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { CheckIcon, XIcon } from "lucide-react";
import { toast } from "sonner";

type InterestType = {
  _id: string;
  title: string;
  selected?: boolean;
};
const Interest = () => {
  const [topics, setTopics] = useState<InterestType[]>([
    {
      _id: "1",
      title: "Artificial Intelligence",
      selected: false,
    },
    {
      _id: "2",
      title: "Climate Change and Sustainability",
      selected: false,
    },
    {
      _id: "3",
      title: "Space Exploration",
      selected: false,
    },
    {
      _id: "4",
      title: "Mindfulness and Mental Health",
      selected: false,
    },
    {
      _id: "5",
      title: "Blockchain Technology",
      selected: false,
    },
    {
      _id: "6",
      title: "Virtual Reality and Augmented Reality",
      selected: false,
    },
    {
      _id: "7",
      title: "Social Justice and Equality",
      selected: false,
    },
    {
      _id: "8",
      title: "Biotechnology and Genetic Engineering",
      selected: false,
    },
    {
      _id: "9",
      title: "Renewable Energy",
      selected: true,
    },
    {
      _id: "10",
      title: "Cultural Diversity and Inclusion",
      selected: false,
    },
  ]);

  const getAllInterestTopics = async () => {
    try {
      const response = await axios.get("/api/profile/v1/interest");
      setTopics(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, []);

  const selectInterest = (topicId: string | number) => {
    const updatedTopics = topics.map((topic) => {
      if (topic._id === topicId) {
        return { ...topic, selected: !topic.selected };
      }
      return topic;
    });
    setTopics(updatedTopics);
  };
  
  const onSubmit = async () => {
    const selectedTopics = topics.filter((item) => item.selected === true);

    if (selectedTopics.length < 3) {
      toast.error("Please select 3 or more topics to finish");
    }
  };

  return (
    <section className="w-full h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-10">
        Topics you arre interested in
      </h1>

      <div className="flex flex-wrap items-center justify-center">
        {topics.map((item) => (
          <button
            key={item._id}
            className={cn(
              "px-3 py-2 rounded-md flex items-center border m-2",
              item.selected && "bg-primary/80 text-white"
            )}
            onClick={() => selectInterest(item._id)}
          >
            {item.title}

            {item.selected ? (
              <CheckIcon className="w-4 h-4 ml-2" />
            ) : (
              <XIcon className="w-4 h-4 ml-2" />
            )}
          </button>
        ))}
      </div>
      <Button className="w-32 mt-10 mx-auto block" onClick={onSubmit}>
        Finish
      </Button>
    </section>
  );
};

export default Interest;

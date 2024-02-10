import React, { useState } from "react";
import {
  Twitter,
  Linkedin,
  Facebook,
  ChefHatIcon,
  MailIcon,
} from "lucide-react";
import { Share2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "../ui";
import { Button } from "@/components/ui";

type ShareLinkPorps = {
  url: string;
  title: string;
  children: React.ReactNode;
};
const ShareLink = ({ url, title, children }: ShareLinkPorps) => {
  const [isCopied, setIsCopied] = useState(false);
  const platforms = [
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/shareArticle?url=encodedUrl&title=encodedTitle",
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: "https://twitter.com/intent/tweet?url=encodedUrl&text=encodedTitle",
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://www.facebook.com/sharer/sharer.php?u=encodedUrl&quote=encodedTitle",
    },
    {
      name: "Email",
      icon: MailIcon,
      url: "mailto:?subject=encodedTitle&body=Check out this link: encodedUrl",
    },
    {
      name: "Reddit",
      icon: Share2,
      url: "https://www.reddit.com/submit?url=encodedUrl&title=encodedTitle",
    },
    {
      name: "WhatsApp",
      icon: ChefHatIcon,
      url: `https://api.whatsapp.com/send?text=encodedTitle: encodedUrl`,
    },
  ];
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="w-[600px] p-7">
        <DialogHeader>
          <DialogTitle>Share Document URL</DialogTitle>
        </DialogHeader>
        <section>
          <div className="flex items-center space-x-2 mt-4 mb-5">
            {platforms.map((item) => (
              <a
                href={item.url
                  .replace("encodedUrl", url)
                  .replace("encodedTitle", title)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center text-xs w-[68px] h-[62px] rounded-md border px-2 py-1"
              >
                <span className="*:w-6 *:-6">
                  <item.icon />
                </span>
                {item.name}
              </a>
            ))}
          </div>
          <p className="mb-1 text-sm font-medium opacity-80">Or Copy Link</p>
          <div className="w-full flex items-center space-x-2">
            <div className="w-full py-1 px-3 pr-1 border rounded-md flex items-center justify-between">
              <span className="font-medium">{url}</span>
              <Button
                className="h-full"
                onClick={() => {
                  navigator.clipboard.writeText(url);
                  setIsCopied(true);
                  setTimeout(() => {
                    setIsCopied(false);
                  }, 2000);
                }}
              >
                {isCopied ? "Copied" : "Copy"}
              </Button>
            </div>
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default ShareLink;

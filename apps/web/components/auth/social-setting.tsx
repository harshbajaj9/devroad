"use client";
import { unlinkAccount } from "@/actions/unlinkAccount";
import { updateUserEmail, updateUsername } from "@/actions/updateUsername";
import { DEFAULT_LOGIN_REDIRECT_URL } from "@/routes";
import { Button, Card, CardContent, CardHeader } from "@repo/ui";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Header from "./header";

interface SocialSettingProps {
  username?: string | null;
  userMail?: string | null;
  googleMail?: string | null;
  googleImage?: string | null;
  githubMail?: string | null;
  githubImage?: string | null;
}
const SocialSetting = ({
  username,
  userMail,
  googleMail,
  googleImage,
  githubMail,
  githubImage,
}: SocialSettingProps) => {
  const [userName, setUserName] = useState(username);
  const [email, setEmail] = useState(userMail);
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT_URL,
    });
  };
  const onClick2 = (provider: "google" | "github") => {
    unlinkAccount(provider);
  };
  const onClick3 = () => {
    if (userName) updateUsername(userName);
  };
  const onClick4 = () => {
    if (email) updateUserEmail(email);
  };
  return (
    <>
      <Card>
        <CardHeader>
          <Header label={"Settings"} />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-x-2">
              <p>Username</p>
              <form>
                <input
                  className="rounded border px-2"
                  value={userName ?? ""}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <button type="submit" onClick={onClick3}>
                  Update
                </button>
              </form>
            </div>
            <div className="flex items-center gap-x-2">
              <p>Email</p>
              <form>
                {userMail && (
                  <>
                    <input
                      className="rounded border px-2"
                      value={email ?? ""}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <button type="submit" onClick={onClick4}>
                      Update
                    </button>
                  </>
                )}
              </form>
            </div>
            {googleMail ? (
              <div className="flex items-center gap-x-2 rounded border p-4">
                <div>
                  <FcGoogle className="h-5 w-5" />
                  <p>{googleMail}</p>
                </div>
                <Button
                  size="lg"
                  className="w-full"
                  variant={"outline"}
                  onClick={() => onClick2("google")}
                >
                  Unlink
                </Button>
              </div>
            ) : (
              <Button
                size="lg"
                className="w-full"
                variant={"outline"}
                onClick={() => onClick("google")}
              >
                <FcGoogle className="h-5 w-5" />
              </Button>
            )}
            {githubMail ? (
              <div className="flex items-center gap-x-2 rounded border p-4">
                <div>
                  <FaGithub className="h-5 w-5" />
                  <p>{githubMail}</p>
                </div>
                <Button
                  size="lg"
                  className="w-full"
                  variant={"outline"}
                  onClick={() => onClick2("github")}
                >
                  Unlink
                </Button>
              </div>
            ) : (
              <Button
                size="lg"
                className="w-full"
                variant={"outline"}
                onClick={() => onClick("github")}
              >
                <FaGithub className="h-5 w-5" />
              </Button>
            )}
            {/* <div className="flex items-center gap-x-2">
              <Button
                size="lg"
                className="w-full"
                variant={"outline"}
                onClick={() => onClick("github")}
              >
                <FaGithub className="h-5 w-5" />
              </Button>
            </div> */}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default SocialSetting;

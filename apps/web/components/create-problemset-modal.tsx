"use client";
import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  RadioGroup,
  RadioGroupItem,
  Toast,
  Input,
} from "@repo/ui";
// import { api } from "~/utils/api";
import { useForm } from "react-hook-form";
// import {
//   OutboundWorkflowFormSchema,
//   outboundWorkflowFormSchema,
// } from "~/zod/forms/visitorFlow";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import router from "next/router";
// import { useVisitorFlow } from "~/store";
// import { OutboundWorkflowStartingTrigger, VisitorFlowV2 } from "@repo/database";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { BookmarkIcon, BookOpenIcon } from "@heroicons/react/24/outline";
import { Poppins } from "next/font/google";
import { api } from "@/trpc/react";
// import { api } from "@/trpc/server";
// import { $Enums } from "@prisma/client";
// import { cn } from "~/lib/utils";
// import { OutboundWorkflowStartingTriggers } from "~/lib/outboundWorkflows";
// import { allowedOutboundWorkflowStartingTriggers } from "~/utils/constants/outbound-workflow";
const font = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});
export const problemSetCreationSchema = z.object({
  name: z.string().min(2),
  description: z.string().max(30),
  starting_trigger: z.enum(["DSA", "CUSTOM"]),
});

export type ProblemSetCreationSchema = z.infer<typeof problemSetCreationSchema>;

type Props = {
  isOpen: boolean;
  onClose: () => void;
  // flowDetails?: VisitorFlowV2;
  refetchData?: () => void;
};

// import { ProblemSetTypes } from "@repo/database";

export const allowedProblemSetTypes: any[] = [
  // $Enums.ProblemSetTypes.DSA,
  // $Enums.ProblemSetTypes.CUSTOM,
  "DSA",
  "CUSTOM",
];

export const problemSetTypes = [
  {
    id: "DSA",
    title: "DSA Problem Set",
    description: "DSA Problem Set, users can start a session on it.",
    icon: <BookOpenIcon className="size-4" />,
  },

  {
    id: "CUSTOM",
    title: "Custom",
    description: "Custom Problem Set, create your own plan",
    icon: <BookmarkIcon className="size-4" />,
  },
];

const CreateProblemSetModal = ({
  isOpen,
  onClose,
  // flowDetails,
  refetchData,
}: Props) => {
  if (!isOpen) return null;
  const { mutateAsync: createProblemSet } =
    api.dsaProblemSet.create.useMutation();
  // const {
  //   selectedFlowId,
  //   setSelectedFlowId,
  //   setSelectedFlowData,
  //   setStartingTriggerType,
  //   setTriggerConditions,
  // } = useVisitorFlow();

  // useEffect(() => {
  //   if (flowDetails) {
  //     form.setValue("name", flowDetails.name);
  //     form.setValue("description", flowDetails.description ?? "");
  //     form.setValue("problemset_type", flowDetails.starting_trigger);
  //   }
  // }, [flowDetails]);

  const handleSave = async (values: any) => {
    if (!values) return;
    if (!allowedProblemSetTypes.includes(values.starting_trigger)) {
      Toast({
        title: `Error: Only Custom, Segment, Webhhoks and Account List Triggers are supported`,
        type: "foreground",
      });
      return;
    }

    const data = {
      title: values.name as string,
      description: values.description as string,
      problemSetType: values.starting_trigger as string,
      // flow_id: selectedFlowId ?? "",
    };
    try {
      const flowId = await createProblemSet(data);
      Toast({
        title: "Outbound workflow created successfully",
      });
      onClose();
      // setStartingTriggerType(values.starting_trigger);
      // const url = `/outbound-workflows/flow/${flowId}`;
      // setSelectedFlowData(null);
      // router.push(url);
      // setSelectedFlowId(flowId);
      // setTriggerConditions([]);
      if (refetchData) refetchData();
    } catch (error) {
      console.error(error);
      Toast({
        type: "foreground",
        title: "Outbound workflow creation failed",
        // message: "Something went wrong. Please try again.",
      });
    }
  };

  const form = useForm<ProblemSetCreationSchema>({
    resolver: zodResolver(problemSetCreationSchema),
    defaultValues: {
      name: "",
      description: "",
      starting_trigger: "DSA",
    },
  });

  const handleCreateFlow = async (values: ProblemSetCreationSchema) => {
    handleSave(values);
  };

  return (
    <div className="border-gray fixed inset-0 left-[50%] top-[50%] z-50 m-4 flex h-fit w-max -translate-x-1/2 -translate-y-1/2 flex-col gap-6 rounded-2xl border bg-backgroundalt p-8">
      <div className="flex flex-col">
        <p className="text-lg font-medium text-foreground">
          New Outbound Workflow
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleCreateFlow)}>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <p className="text-sm font-medium text-muted-foreground">Name</p>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className={cn("w-80 bg-background ", font.className)}
                        placeholder="Problem Set Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className={cn("w-80 bg-background ", font.className)}
                      placeholder="Description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="starting_trigger"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <FormLabel className="text-sm font-medium text-muted-foreground">
                    Select Type
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      className="grid grid-cols-3 gap-3"
                      value={field.value}
                    >
                      {problemSetTypes.map((s) => {
                        return (
                          <FormItem
                            key={s.id}
                            // value={s.title}
                            className={cn(
                              "relative flex h-24 min-w-[236px] max-w-[236px] cursor-pointer flex-col items-start justify-start space-y-0 rounded-2xl border-2 p-4 text-sm font-medium",
                              field.value === s.id
                                ? "border-primary bg-primary/10"
                                : "border-border"
                            )}
                          >
                            <div className="flex flex-col gap-1">
                              <span className="flex w-full items-center justify-between ">
                                <FormLabel className="text-lg font-medium  text-foreground">
                                  {s.title}
                                </FormLabel>
                                {s.icon}
                              </span>
                              <FormDescription className="text-xs font-normal  text-muted-foreground">
                                {s.description}
                              </FormDescription>
                            </div>
                            <FormControl
                              className={cn(
                                "absolute left-0 top-0",
                                field.value === s.id
                                  ? "border-primary-600"
                                  : "border-gray-300 bg-white"
                              )}
                            >
                              <RadioGroupItem
                                value={s.id}
                                className="h-full w-full opacity-0"
                              />
                            </FormControl>
                          </FormItem>
                        );
                      })}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
      <div className="flex justify-end gap-2">
        <Button
          variant={"outline"}
          onClick={() => {
            onClose();
          }}
          size={"lg"}
        >
          Cancel
        </Button>
        <Button
          variant={"default"}
          onClick={form.handleSubmit(handleCreateFlow)}
          size={"lg"}
          type="submit"
        >
          Create
        </Button>
      </div>
    </div>
  );
};

export default CreateProblemSetModal;

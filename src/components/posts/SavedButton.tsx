import { useToast } from "@/hooks/use-toast"
import kyInstance from "@/lib/ky";
import { LikesInfo, SavedInfo } from "@/lib/types"
import { cn } from "@/lib/utils";
import { QueryKey, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Bookmark, SaveIcon } from "lucide-react";

interface SavedButtonProps{
    postId:string,
    initialState:SavedInfo
}
export default function SavedButton({postId,initialState}:SavedButtonProps){
    const {toast} = useToast();

    const queryClient = useQueryClient();

    const queryKey:QueryKey=["saved-info",postId]

    const {data} = useQuery({
        queryKey,
        queryFn:()=>kyInstance.get(`/api/posts/${postId}/saved`).json<SavedInfo>(),
        initialData:initialState,
        staleTime:Infinity
    });

    const {mutate} = useMutation({
        mutationFn:()=>
            data.isSavedByUser?kyInstance.delete(`/api/posts/${postId}/save`):kyInstance.post(`/api/posts/${postId}/save`),
        onMutate:async ()=> {

            toast(
                {description:
                    `Post ${data.isSavedByUser?"un":""}saved succesfuly`
                }
            )

            await queryClient.cancelQueries({queryKey});

            const previousState = queryClient.getQueryData<SavedInfo>(queryKey);

            queryClient.setQueryData<SavedInfo>(queryKey,()=>({
                
                isSavedByUser:!previousState?.isSavedByUser
            }))
            return {previousState};
        },
        onError(error, variables, context) {
            queryClient.setQueryData(queryKey, context?.previousState);
            console.error(error);
            toast({
              variant: "destructive",
              description: "Something went wrong. Please try again.",
            });
        },
    });

    return <button onClick={()=>mutate()} className="flex items-center gap-2">

        <Bookmark className={cn("size-5",data.isSavedByUser&&"fill-red-500 text-red-500")}/>
      
    </button>
}
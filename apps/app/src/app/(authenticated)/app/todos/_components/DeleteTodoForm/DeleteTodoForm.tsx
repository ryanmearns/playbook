"use client";

import { Todo, Todos } from "@/db/types";
import { OptimisticUpdate } from "@/types/helpers";
import { useAction } from "@/utils/actions/hook";
import {
  IconButton,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@playbook/ui";
import { Trash } from "lucide-react";
import { deleteTodoAction } from "../../_api/delete-todo";

type DeleteTodoFormProps = {
  todo: Todo;
  optimisticUpdate: OptimisticUpdate<Todos>;
};

export const DeleteTodoForm = (props: DeleteTodoFormProps) => {
  const action = useAction(deleteTodoAction, {
    onMutate: (input) => {
      props.optimisticUpdate((data) => {
        return data.filter((todo) => input.uuid !== todo.uuid);
      });
    },
  });

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <IconButton
            icon={<Trash />}
            onClick={() => action.execute({ uuid: props.todo.uuid })}
            className="invisible group-hover:visible"
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>Delete todo</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
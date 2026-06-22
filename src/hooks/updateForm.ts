import { getErrorsMessage } from "@/utils/utils";
import {
  type MutationFunction,
  type QueryKey,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import z from "zod";

type FormDataProps<TSchema extends z.ZodTypeAny, TResult = z.output<TSchema>> = {
  entity: string;
  schema: TSchema;
  mutationFn: MutationFunction<TResult, z.output<TSchema>>;
  queryKey?: QueryKey;
};

function useSendAndValidData<TSchema extends z.ZodTypeAny, TResult = z.output<TSchema>>({
  schema,
  entity,
  mutationFn,
  queryKey = [entity],
}: FormDataProps<TSchema, TResult>) {
  const queryClient = useQueryClient();

  const mutation = useMutation<TResult, Error, z.output<TSchema>>({
    mutationFn,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  async function submit(data: unknown) {
    const valid = schema.safeParse(data);

    if (!valid.success) {
      throw new Error("Error: " + valid.error.message);
    }

    try {
      return await mutation.mutateAsync(valid.data);
    } catch (error) {
      throw new Error("Error: " + getErrorsMessage(error));
    }
  }

  return {
    ...mutation,
    submit,
  };
}

export default useSendAndValidData;
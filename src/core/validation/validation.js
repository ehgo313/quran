import { ref } from 'vue';

export function useValidation() {
  const errors = ref([]);

  function hasError(key) {
    return !!errors.value.find((issue) => issue.path === key);
  }

  function getError(key) {
    return hasError(key)
      ? errors.value.find((issue) => issue.path === key).message
      : null;
  }

  async function validate(schema, data) {
    const res = await schema.safeParseAsync(data);

    if (!res.success) {
      errors.value = res.error.issues.map((item) => {
        return {
          path: item.path[0],
          message: item.message,
        };
      });

      return [null, errors.value];
    } else {
      return [res.data, null];
    }
  }

  return { errors, hasError, getError, validate };
}

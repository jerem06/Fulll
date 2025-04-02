## Mobile Quizz

1. What would return the following code?

```jsx
class Content extends React.Component {
  render() {
    return (
      <>
        <Text>Hello</Text>
        <Text>World</Text>
      </>
    );
  }
}

class Container extends React.Component {
  render() {
    return (
      <ScrollView>
        <View>
          <Content />
        </View>
      </ScrollView>
    );
  }
}
```

- A
  ```jsx
  <ScrollView>
    <View>
      <View>
        <Text>Hello</Text>
        <Text>World</Text>
      </View>
    </View>
  </ScrollView>
  ```

2. Which reducer code do not follow best practices?

- A

  ```ts
  case ADD_USERID:
      state.users.push[4];
      return state;
  ```

- C
  ```ts
  case UPDATE_NOTIFICATION_COUNT:
      state.notificationCounter = state.notificationCounter + 1
      return state;
  ```

3. Which reducer code is correct?

- A)

  ```ts
  export function userSetData(
    state: IUserState,
    action: UserSetDataAction
  ): IUserState {
    const { data, authType } = action;

    return { ...state, data, authType, loading: false };
  }
  ```

4. A higher-order component is a function that:

   - A) takes a component and returns a new component

5. What is "windowing"?

   - B) a technique to render a small subset of a larger dataset

6. Which methods are not usable with React hooks?

   - A) getDerivedStateFromError
   - B) componentWillUnmount
   - C) componentDidUpdate

7. Which status code is not an error?

   - A) 204
   - D) 200

8. Use Typescript to describe the following function which returns a success message when the request has been successfully sent, returns a code status when the request has failed.

   ```ts
   /* Usage */
   const messageOrCodeStatus = await registerUser("Laurent", 35);
   ```

   ```ts
   type RegisterUserResponse = {
     success: boolean;
     message?: string;
     statusCode?: number;
   };

   async function registerUser(
     name: string,
     age: number
   ): Promise<RegisterUserResponse> {
     try {
       // Implementation would go here
       return { success: true, message: "User registered successfully" };
     } catch (error) {
       return { success: false, statusCode: 500 };
     }
   }
   ```

9. What is the main difference between queries and mutations in GraphQL? Queries are used to get data and fields are executed in parallel; mutations are used to create, edit or delete data and executed serially for the top-level fields.

The statement are correct.

10. What does not permit to interact with servers within React Native project?

- C) SwiftUI

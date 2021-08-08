#include <iostream>
#include <string.h>
using namespace std;

#define expLen 100

class Stack 
{ 
    private:
        int top; 
        unsigned capacity; 
        int* container; 
    public:
        Stack* createStack(unsigned capactiy);
        int isEmpty(Stack* stack);
        int peek(Stack* stack);
        int pop(Stack* stack);
        void push(Stack* stack ,int op);
        int evaluatePostfix(char* exp);
        void operationList();
}; 
   
Stack* Stack::createStack( unsigned capacity ) 
{ 
    Stack* stack = new Stack();
  
    if (!stack) return NULL; 
  
    stack->top = -1; 
    stack->capacity = capacity; 
    stack->container = new int[(stack->capacity * sizeof(int))]; 
  
    if (!stack->container) return NULL; 
  
    return stack; 
} 
  
int Stack::isEmpty(Stack* stack) 
{ 
    if(stack->top == -1){
        return true;
    }else{
        return false;
    }
} 
  
int Stack::peek(Stack* stack) 
{ 
    if(!isEmpty(stack)){
        return stack->container[stack->top]; 
    }else{
        return false;
    }
} 
  
int Stack::pop(Stack* stack) 
{ 
    if (!isEmpty(stack))
    {
        return stack->container[stack->top--] ;
    }else{
        return false;
    }
} 
  
void Stack::push(Stack* stack,int op) 
{ 
    stack->container[++stack->top] = op; 
}

int Stack::evaluatePostfix(char* exp) 
{ 

    Stack* stack = createStack(strlen(exp)); 
    int i; 
  
    if (!stack) return -1; 

    for (i = 0; exp[i]; ++i) 
    { 
        if(exp[i] == ' ')continue; 

        else if (isdigit(exp[i])) 
        { 
            int num=0; 

            while(isdigit(exp[i])) 
            {
            num = num * 10 + (int)(exp[i] - '0'); 
                i++; 
            } 
            i--; 
            push(stack,num); 
        } 
          
        else
        { 
            int val1 = pop(stack); 
            int val2 = pop(stack); 
              
            switch (exp[i]) 
            { 
            case '+': push(stack, val2 + val1); break; 
            case '-': push(stack, val2 - val1); break; 
            case '*': push(stack, val2 * val1); break; 
            case '/': push(stack, val2/val1); break;
            case '%': push(stack, (((val2%val1)+val1)%val1)); break;    
            } 
        } 
    } 
    return pop(stack); 
}
  
int main() 
{
    Stack s;
    int choice;
    char exp[expLen];
    cout << "Enter Valid Expression: ";
    cin.getline(exp, expLen);
    cout << "Result = ";
    cout << s.evaluatePostfix(exp); 
    return 0; 
}
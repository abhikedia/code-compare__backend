#include <bits/stdc++.h>
using namespace std;

class Solution
{
public:
    bool validateStackSequences(vector<int> &pushed, vector<int> &popped)
    {
        stack<int> store;
        store.push(pushed[0]);
        int i = 1, j = 0, size = popped.size();
        int top = store.top();
        while (j < size)
        {
            while (top != popped[j] && i < size)
            {
                store.push(pushed[i++]);
                top = store.top();
            }
            if (top == popped[j] && store.size())
            {
                store.pop();
                j++;
                if (store.size())
                    top = store.top();
            }
            else
                return false;
        }
        return true;
    }
};

int main()
{
    Solution s;
    vector<int> pushed = {1, 2, 3, 4, 5}, popped = {4, 5, 3, 2, 1};
    cout << s.validateStackSequences(pushed, popped);
    return 0;
}
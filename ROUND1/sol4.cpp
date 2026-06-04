#include <iostream>
#include <string>
#include <unordered_map>

using namespace std;

int findLongestSubstring(string str) {
    unordered_map<char, int> lastSeen;

    int left = 0;
    int maxLen = 0;

    for (int right = 0; right < str.length(); right++) {

        if (lastSeen.find(str[right]) != lastSeen.end() &&
            lastSeen[str[right]] >= left) {
            left = lastSeen[str[right]] + 1;
        }

        lastSeen[str[right]] = right;

        maxLen = max(maxLen, right - left + 1);
    }

    return maxLen;
}

int main() {
    string str = "pwwkew";

    cout << findLongestSubstring(str);

    return 0;
}
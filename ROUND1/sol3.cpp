#include <iostream>
#include <unordered_map>
#include <string>
#include <cctype>

using namespace std;

bool isAnagram(string s1, string s2) {
    unordered_map<char, int> freq;

    for (char ch : s1) {
        if (ch != ' ') {
            freq[tolower(ch)]++;
        }
    }

    for (char ch : s2) {
        if (ch != ' ') {
            freq[tolower(ch)]--;
        }
    }

    for (auto pair : freq) {
        if (pair.second != 0) {
            return false;
        }
    }

    return true;
}

int main() {
    string s1 = "Listen";
    string s2 = "Silent";

    if (isAnagram(s1, s2))
        cout << "true";
    else
        cout << "false";

    return 0;
}
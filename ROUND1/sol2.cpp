#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

void rotateRight(vector<int>& nums, int k) {
    int n = nums.size();
    if (n == 0) return;

    k = k % n;

    reverse(nums.begin(), nums.end());
    reverse(nums.begin(), nums.begin() + k);
    reverse(nums.begin() + k, nums.end());
}

int main() {
    vector<int> nums = {1, 2, 3, 4, 5, 6, 7};
    int k = 3;

    rotateRight(nums, k);

    return 0;
}
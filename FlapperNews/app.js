var app = angular.module('flapperNews', ['ui.router']);

app.config([  //creates the state for home and posts page
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl'
    })
    
    .state('posts', {
  url: '/posts/{id}',
  templateUrl: '/posts.html',
  controller: 'PostsCtrl'
});
  $urlRouterProvider.otherwise('home');
  
}]);

app.factory('posts', [function(){
var o = {
    posts: []
  };
  return o;
}]);


app.controller('MainCtrl', [ //main controller
'$scope',
'posts',
function($scope, posts){
  
  $scope.posts = posts.posts;

$scope.addPost = function(){ //function to add posts
  if(!$scope.title || $scope.title === '') { return; } //doesn't allow blanks
  $scope.posts.push({
  title: $scope.title,
  link: $scope.link,
  upvotes: 0,
  comments: [
    {author: 'Joe', body: 'Cool post!', upvotes: 0},
    {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
  ]
});

  $scope.title = '';
  $scope.link = '';
  
};

$scope.incrementUpvotes = function(post) {
  post.upvotes += 1;
};
}]);


app.controller('PostsCtrl', [ //posts page to view comments
'$scope',
'$stateParams',
'posts',
function($scope, $stateParams, posts){
    $scope.post = posts.posts[$stateParams.id];
    
    $scope.addComment = function(){
  if($scope.body === '') { return; }
  $scope.post.comments.push({
    body: $scope.body,
    author: 'user',
    upvotes: 0
  });
  $scope.body = '';
};
  
  $scope.incrementUpvotes = function(comment){
    comment.upvotes +=1;
  };

}]);
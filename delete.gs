function deleteEmailsWithKeywords() {
  var keywords = ["メルマガ", "購読", "ニュース"];
  var inboxThreads = GmailApp.getInboxThreads();
  processThreads(inboxThreads, keywords);
  var threads = GmailApp.search('in:trash');
  processThreads(threads, keywords);
}

function processThreads(threads, keywords) {
  for (var i = 0; i < threads.length; i++) {
    var thread = threads[i];
    var messages = thread.getMessages();

    for (var j = 0; j < messages.length; j++) {
      var message = messages[j];
      var subject = message.getSubject().toLowerCase();
      var body = message.getPlainBody().toLowerCase();

      if (containsKeyword(subject, keywords) || containsKeyword(body, keywords)) {
        Logger.log("削除したメールの件名: " + subject);

        message.moveToTrash();
      }
    }
  }
}

function containsKeyword(text, keywords) {
  for (var i = 0; i < keywords.length; i++) {
    if (text.indexOf(keywords[i].toLowerCase()) !== -1) {
      return true;
    }
  }
  return false;
}

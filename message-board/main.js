  fetch('message.json')
      .then(function (response) {
          return response.json();
      })
      .then(function (data) {
          // console.log(data);
          $.each(data, function (index, new_post) {
              var old_msg = $('.cards').html();
              $('.cards').html(`
                <div class="card">
                    <a href="${new_post.href}">
                        <div class="image_box">
                            <img src="${new_post.image_url}" alt="">
                        </div>
                        <div class="massage_box">
                            <h2>${new_post.title}</h2>
                            <p>發佈日期：${new_post.date}</p>
                            <p>${new_post.content}</p>
                        </div>
                    </a>
            </div>
            ${old_msg}
            `)

          })

      })
  $('.btn').click(function () {
      var post_title = $('#title').val();
      var post_content = $('#content').val();
      var post_href = $('#href').val();
      var post_imgUrl = $('#image_url').val();


      var now_date = new Date();
      var date = now_date.getFullYear() + '年' + (now_date.getMonth() + 1) + '月' + now_date.getDate() + '日';

      // //     var old_msg = $('.cards').html();
      // //    
      // //     $('.cards').html(`
      // //     <div class="card">
      // //         <a href="${post_href}">
      // //             <div class="image_box">
      // //                 <img src="${post_imgUrl}" alt="">
      // //             </div>
      // //             <div class="massage_box">
      // //                 <h2>${post_title}</h2>
      // //                 <p>發佈日期：${date}</p>
      // //                 <p>${post_content}</p>
      // //             </div>
      // //         </a>
      // // </div>
      // // ${old_msg}   
      // // `)

      $('input,textarea').val('');
      var post_msg = {
          'title': post_title,
          'content': post_content,
          'href': post_href,
          'image_url': post_imgUrl,
          'date': date
      }

      $.ajax({
          url: 'message.json',
          type: 'GET',
          data: post_msg,
          dataType: 'json',
          success: function (result) {
              var old_msg = $('.cards').html();

              $('.cards').html(`
                        <div class="card">
                            <a href="${post_href}">
                                <div class="image_box">
                                    <img src="${post_imgUrl}" alt="">
                                </div>
                                <div class="massage_box">
                                    <h2>${post_title}</h2>
                                    <p>發佈日期：${date}</p>
                                    <p>${post_content}</p>
                                </div>
                            </a>
                        </div>
                    ${old_msg}
                `)

          },
          error: function (result) {
              console.log(result);
          }
      })
  });
<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class PlaintextMail extends Mailable
{
  use Queueable, SerializesModels;

  public $mailMessage;
  private $title;
  private $attendeeMails;

  /**
   * Create a new message instance.
   *
   * @return void
   */
  public function __construct(string $title, string $message, $attendeeMails)
  {
    $this->title = $title;
    $this->mailMessage = $message;
    $this->attendeeMails = $attendeeMails;
  }

  /**
   * Build the message.
   *
   * @return $this
   */
  public function build()
  {
    return $this->view('mails.plaintext')->subject($this->title)->bcc($this->attendeeMails);
  }
}

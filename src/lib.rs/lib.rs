use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    pubkey::Pubkey,
    msg,
};

entrypoint!(process_instruction);

fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    msg!("Hello, Solana Beach Coin Program!");

    // Here you would add your fee logic, token transfer, etc.

    Ok(())
}
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    pubkey::Pubkey,
    program_error::ProgramError,
    // The following are needed for real token transfers:
    // program::invoke,
    // system_instruction,
};

entrypoint!(process_instruction);

fn process_instruction(
    _program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    msg!("Custom token transfer with fee!");

    let account_info_iter = &mut accounts.iter();
    let sender = next_account_info(account_info_iter)?;         // The sender's token account
    let recipient = next_account_info(account_info_iter)?;      // The recipient's token account
    let fee_wallet = next_account_info(account_info_iter)?;     // The fee wallet's token account
    let sender_authority = next_account_info(account_info_iter)?; // The sender's wallet (signer)

    // For demo: Parse amount from instruction_data (must be 8 bytes for u64)
    if instruction_data.len() != 8 {
        msg!("Instruction data must be 8 bytes (u64 amount)");
        return Err(ProgramError::InvalidInstructionData);
    }
    let amount = u64::from_le_bytes(instruction_data.try_into().unwrap());

    // Calculate fee (e.g., 1%)
    let fee = amount / 100;
    let amount_after_fee = amount - fee;

    // --- Pseudo-code for SPL Token transfer ---
    // You would use invoke() to call the SPL Token program's transfer instruction.
    // This is a placeholder for the real logic!
    msg!("Would transfer {} tokens to recipient, {} tokens as fee to fee_wallet", amount_after_fee, fee);

    // Example (not functional, for illustration only):
    // invoke(
    //     &spl_token::instruction::transfer(
    //         &spl_token::id(),
    //         sender.key,
    //         recipient.key,
    //         sender_authority.key,
    //         &[],
    //         amount_after_fee,
    //     )?,
    //     &[sender.clone(), recipient.clone(), sender_authority.clone()],
    // )?;
    // invoke(
    //     &spl_token::instruction::transfer(
    //         &spl_token::id(),
    //         sender.key,
    //         fee_wallet.key,
    //         sender_authority.key,
    //         &[],
    //         fee,
    //     )?,
    //     &[sender.clone(), fee_wallet.clone(), sender_authority.clone()],
    // )?;

    Ok(())
}